uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.88 + t * 3.96 + ph) + sin(p.y * 9.10 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.29) * p;
	p *= 1.66;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.14, 0.59), vec3(0.56, 0.71, 0.99), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
