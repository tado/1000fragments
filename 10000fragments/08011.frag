uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.35 * sin(t * 0.51) + t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.51) * p * 8.23;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.09, 0.03, 0.08), vec3(0.93, 0.78, 0.66), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
