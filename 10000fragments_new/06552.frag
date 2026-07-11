uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.13 * cos(sa * 4.0 + t * 2.70 + ph);
    v = sin((sr - petal) * 6.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = rot2(length(p) * 1.63 + time * 1.41) * p;
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 4.39 - time * 0.30); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(2.47) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.04, 0.43), vec3(0.64, 0.69, 0.48), d);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
