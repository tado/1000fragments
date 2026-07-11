uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.53 + 0.17 * sin(t * 1.18)) + vec2(-0.54, -0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.12 * p.y + time * 2.18); p.y += 0.44 / wf * cos(wf * 2.16 * p.x + time * 0.90); }
	p = rot2(length(p) * 2.44 + time * 0.56) * p;
	p = rot2(0.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.03, vec3(0.52, 0.54, 0.50), vec3(0.31, 0.37, 0.49), vec3(1.39, 0.86, 1.06), vec3(0.71, 0.19, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
