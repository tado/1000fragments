uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.24;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.25 - t * 5.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	float d = 0.5 + 0.5 * field(p, (time * 0.78), 0.0);
	vec2 hq = rot2(0.86) * p * 20.25;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.81 + (time * 0.78) * 0.06, vec3(0.43, 0.48, 0.47), vec3(0.19, 0.20, 0.22), vec3(0.80, 0.57, 0.50), vec3(0.71, 0.18, 0.51)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.942, 0.982, 1.040) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
