uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.67 + t * 5.18 + ph) + sin(p.y * 8.62 - t * 5.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	p = rot2(p.y * -3.98 + time * 0.68) * p;
	p = abs(p);
	p = fract(p * 1.44) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.75 + time * 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
