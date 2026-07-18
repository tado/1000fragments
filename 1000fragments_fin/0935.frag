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
    vec2 wq = vec2(vnoise2(p * 2.66 + ph), vnoise2(p * 2.66 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.66 + 3.17 * wq + vec2(1.7, 9.2) + t * 1.03),
                   vnoise2(p * 2.66 + 3.62 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 2.66 + 1.26 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 1.43 + (time * 0.84) * 0.47) * 0.13;
	float an = atan(p.y, p.x) + (time * 0.84) * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.51 / 3.1415927, 1.50 / r + (time * 0.84) * 2.35);
	float d = field(tv, (time * 0.84), 0.0);
	vec3 col = vec3(0.997, 0.568, 0.290) * (0.10 / (abs((d)) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.55, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.999, 1.004, 1.002);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
