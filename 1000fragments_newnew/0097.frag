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
    vec2 wq = vec2(vnoise2(p * 3.94 + ph), vnoise2(p * 3.94 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.94 + 2.89 * wq + vec2(1.7, 9.2) + t * 0.47),
                   vnoise2(p * 3.94 + 3.56 * wq + vec2(8.3, 2.8) - t * 1.16));
    v = vnoise2(p * 3.94 + 3.67 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.74) * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 0.52 / r - (time * 0.74) * 2.30);
	float d = field(tv, (time * 0.74), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.73, 0.76, 0.78), vec3(0.04, 0.11, 0.07), cc);
	col *= clamp(r * 1.41, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.975, 1.001) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
