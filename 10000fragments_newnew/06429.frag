uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.08 + 0.14 * sin(t * 0.85)) + vec2(-0.60, 0.08) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p = rot2(2.29) * p;
	p = sin(p * 1.90 + time * 2.44) * 1.24;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p *= 1.0 + 0.28 * sin(time * 3.08);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.42, 0.39), vec3(0.75, 0.80, 0.86), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
