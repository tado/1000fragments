uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.54) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 2.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 5.78 - time * 0.42); }
	p = rot2(length(p) * -1.49 + time * 1.40) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.24, 0.48), vec3(0.63, 0.66, 0.76), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
