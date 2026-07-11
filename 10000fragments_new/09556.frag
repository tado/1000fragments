uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.10 + ph), vnoise2(p * 2.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.10 + 1.70 * wq + vec2(1.7, 9.2) + t * 1.11),
                   vnoise2(p * 2.10 + 3.31 * wq + vec2(8.3, 2.8) - t * 0.47));
    v = vnoise2(p * 2.10 + 1.36 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.24), cos(time * 1.35)) * 0.25;
	float an = atan(p.y, p.x) + time * -0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.44 / 3.1415927, 1.43 / r - time * 0.79);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.72, 0.56, 0.73) * (0.12 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.25, 0.0, 1.0);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 1.53 + time * 4.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
