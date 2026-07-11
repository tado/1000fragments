uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.24 * cos(sa * 5 + t * 1.44 + ph);
    v = sin((sr - petal) * 13.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.24;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(2.14) * p; }
	p = fract(p * 1.29) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 3.47 - time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.04);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
