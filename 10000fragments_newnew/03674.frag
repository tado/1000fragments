uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.89 * sin(t * 1.43) + t * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p = rot2(1.42) * p;
	p.y += sin(p.x * 3.03 + time * 3.10) * 0.19;
	p += vec2(0.53, -0.75) * sin(length(p) * 3.85 - time * 2.20) * 0.16;
	p *= 1.0 + 0.17 * sin(time * 2.87);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.48, 1.37, 1.48) + vec3(0.18, 0.04, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
