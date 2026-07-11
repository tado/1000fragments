uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 2.30 * sin(t * 0.51) + t * 2.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	p = rot2(time * -1.57) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.19, 0.10), vec3(0.61, 0.52, 0.93), d);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.29 + time * 6.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
