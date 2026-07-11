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
    v = sin(sa * 10.79 + sr * 21.79 - t * 0.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.66) * p;
	p += vec2(0.28, 0.80) * sin(length(p) * 2.14 - time * 1.79) * 0.30;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.49; p = rot2(0.66) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.45 + time * 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
