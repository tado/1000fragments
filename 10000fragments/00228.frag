uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.38 + t * 3.20 + ph) + sin(p.y * 12.29 - t * 4.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.48; p = rot2(1.04) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.28);
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
