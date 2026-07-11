uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.27 * sin(t * 0.96) + t * 4.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	p = fract(p * 2.08) - 0.5;
	p = rot2(time * 0.85) * p;
	p = abs(p) - 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.30, 0.66, 0.72) * (0.05 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
