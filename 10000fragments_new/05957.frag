uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.86 + 0.15 * sin(t * 1.53)) + vec2(-0.69, 0.00) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p = rot2(time * 0.59) * p;
	p = (floor(p * 25.8) + 0.5) / 25.8;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 2.73 * p.y + time * 1.49); p.y += 0.25 / wf * cos(wf * 3.94 * p.x + time * 1.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.01, vec3(0.59, 0.54, 0.56), vec3(0.40, 0.30, 0.30), vec3(1.18, 1.05, 0.87), vec3(0.85, 0.67, 0.17));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.73 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
