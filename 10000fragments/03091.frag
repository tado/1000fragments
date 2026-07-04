uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.81 + t * 2.83 + ph) * 0.7;
    float wb = sin(p.y * 12.10 - t * 3.98 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p = sin(p * 1.98 + time * 1.27) * 1.27;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.24; p = rot2(1.58) * p; }
	p *= 2.62;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.11);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
