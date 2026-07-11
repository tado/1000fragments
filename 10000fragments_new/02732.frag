uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 7.14 * sin(t * 0.50) + t * 2.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * 1.44) * p;
	p += vec2(-0.04, 0.85) * sin(length(p) * 4.32 - time * 2.30) * 0.40;
	p = rot2(length(p) * 3.98 + time * 0.64) * p;
	p = fract(p * 1.04) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
