uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.74 * sin(t * 0.88) + t * 4.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.73 + time * 0.57) * p;
	p = fract(p * 2.80) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.40, 0.78, 0.98) * (0.21 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
