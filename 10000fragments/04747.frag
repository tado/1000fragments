uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.18 + t * 1.70 + ph) + sin(p.y * 4.55 - t * 3.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.97) - 0.5;
	p *= 2.56;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(0.70) * p; }
	p = rot2(p.y * 3.99 + time * 0.64) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.04, 0.01), vec3(0.51, 0.55, 0.64), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
