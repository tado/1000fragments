uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.95) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.20 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.08 + time * 1.12) * p;
	p *= 1.93;
	p = abs(p);
	p = rot2(p.y * -1.67 + time * 0.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.70 + time * 0.18);
	col = fract(col * 1.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
