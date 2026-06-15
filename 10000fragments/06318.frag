uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.58 + t * 5.68 + ph) + sin(p.y * 9.78 - t * 2.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	p = abs(p);
	p += vec2(-0.89, -0.47) * sin(length(p) * 5.02 - time * 1.14) * 0.22;
	p = rot2(p.y * -3.49 + time * 0.54) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.42; p = rot2(2.12) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.93 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
