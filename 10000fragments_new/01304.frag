uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.16 * cos(sa * 8.0 + t * 1.50 + ph);
    v = sin((sr - petal) * 11.51);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = rot2(2.15) * p;
	p = rot2(p.y * 3.64 + time * 0.21) * p;
	p = abs(p) - 0.22;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.10, 0.49), vec3(0.57, 0.90, 0.50), d);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.90 + time * 15.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
