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
    v = sin(qa * 12.0 + qr * 3.02 * sin(t * 0.83) + t * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = rot2(time * 0.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.05, vec3(0.52, 0.54, 0.44), vec3(0.34, 0.48, 0.43), vec3(1.38, 1.38, 1.40), vec3(0.54, 0.18, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
