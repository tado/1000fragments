uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.21) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	{ p = vec2(atan(p.y, p.x) * 1.91, length(p) * 2.49 - time * 0.28); }
	p += vec2(-0.99, 0.92) * sin(length(p) * 3.44 - time * 0.69) * 0.37;
	p *= 1.82;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.66 + time * 0.15);
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
