uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.06 + t * 1.29) - 0.5) * 2.0;
    v = sin((p.y * 3.26 + zx * 0.58 + t * 2.21) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 0.49)) * 0.30;
	float an = atan(p.y, p.x) + time * 0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.51 / 3.1415927, 0.82 / r + time * 2.13);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.16);
	col *= clamp(r * 2.48, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
