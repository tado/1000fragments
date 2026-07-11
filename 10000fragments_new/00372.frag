uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.76 - t * 4.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = rot2(length(p) * -2.26 + time * 0.90) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.99) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(2.58) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.99 + time * 0.22);
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
