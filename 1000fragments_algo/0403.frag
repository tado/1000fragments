uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.23 * pow(abs(cos(ra * 7.0 + t * 2.73)), 2.03);
    v = sin((rr - pet) * 22.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	float d = 0.5 + 0.5 * field(p, (time * 0.73), 0.0);
	vec2 hq = rot2(0.39) * p * 21.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.12, 0.02, 0.20), vec3(0.94, 0.81, 0.68), v);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.977, 1.051) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
