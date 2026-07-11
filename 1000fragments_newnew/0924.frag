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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.93 * sin(t * 0.53) + t * 5.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	float d = 0.5 + 0.5 * field(p, (time * 0.69), 0.0);
	vec2 hq = rot2(0.21) * p * 18.65;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 1.09 + (time * 0.69) * 0.04, vec3(0.22, 0.31, 0.30), vec3(0.18, 0.21, 0.16), vec3(0.76, 0.54, 0.57), vec3(0.35, 0.96, 0.54)) * v;
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.976, 1.059) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
