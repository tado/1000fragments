uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.14 - t * 0.80;
    v = sin(floor(lv * 3.3) / 3.3 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.55), 0.0);
	vec2 hq = rot2(1.10) * p * 9.40;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.04, 0.00, 0.18), vec3(0.89, 0.77, 0.89), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 0.997, 0.959) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
