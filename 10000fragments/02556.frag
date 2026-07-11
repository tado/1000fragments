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
    float petal = 0.48 + 0.25 * cos(sa * 6 + t * 0.88 + ph);
    v = sin((sr - petal) * 13.04);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.23 + time * 0.73) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.58; p = rot2(2.59) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.14 + time * 0.26);
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
