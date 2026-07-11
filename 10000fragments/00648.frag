uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.71 + sin(p.y * 2.02 + t * 5.99) * 4.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	p = fract(p * 2.80) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.20) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.16 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
