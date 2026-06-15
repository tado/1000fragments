uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.96) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 3.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 2.78 - time * 0.42); }
	p = rot2(0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.85 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
