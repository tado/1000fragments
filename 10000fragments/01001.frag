uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.81 + vec2(t * 2.14, -t * 2.14) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.31; p = rot2(0.62) * p; }
	p = fract(p * 1.93) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.55 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
