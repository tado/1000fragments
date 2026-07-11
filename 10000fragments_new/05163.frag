uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 2.22 * sin(t * 0.56) + t * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 26.9) + 0.5) / 26.9;
	p = rot2(time * -0.77) * p;
	p += vec2(0.57, 0.51) * sin(length(p) * 2.48 - time * 1.21) * 0.39;
	p = abs(p) - 0.71;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
