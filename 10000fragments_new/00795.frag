uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.81 + sr * 17.23 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.45;
	p = rot2(length(p) * 3.78 + time * 0.59) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.24, 0.02), vec3(0.60, 0.84, 0.82), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
