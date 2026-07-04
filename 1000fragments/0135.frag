uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.16 * pow(abs(cos(ra * 3.0 + t * 2.03)), 1.85);
    v = sin((rr - pet) * 16.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.88) * p * 13.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.08, 0.05, 0.13), vec3(0.95, 0.84, 0.75), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
