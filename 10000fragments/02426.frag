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
    v = sin(sa * 2.78 + sr * 5.46 - t * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	p = rot2(time * -0.69) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(0.43) * p; }
	p = rot2(p.y * 3.72 + time * 0.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.22);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
