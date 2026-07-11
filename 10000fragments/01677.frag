uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.94 - t * 6.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	{ p = vec2(atan(p.y, p.x) * 2.51, length(p) * 5.95 - time * 0.17); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.15; p = rot2(0.80) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.90 + time * 0.17);
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
