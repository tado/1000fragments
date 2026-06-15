uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.35) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 0.86 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	p = rot2(time * -0.63) * p;
	p = rot2(p.y * -2.90 + time * 0.20) * p;
	p = abs(p) - 0.67;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.22 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
