uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 2.03 * sin(t * 1.00) + t * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.16) * p;
	p = (floor(p * 7.3) + 0.5) / 7.3;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.23, 0.25), vec3(0.76, 0.83, 0.78), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
