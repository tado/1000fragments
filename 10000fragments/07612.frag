uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.33 * sin(t * 0.89) + t * 1.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = rot2(time * -1.15) * p;
	p = rot2(length(p) * 3.24 + time * 1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.12, vec3(0.44, 0.58, 0.55), vec3(0.36, 0.36, 0.40), vec3(1.00, 1.18, 0.93), vec3(0.70, 0.25, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
