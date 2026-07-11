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
    vec2 wq = vec2(vnoise2(p * 3.30 + ph), vnoise2(p * 3.30 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.30 + 3.13 * wq + vec2(1.7, 9.2) + t * 0.77),
                   vnoise2(p * 3.30 + 3.44 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 3.30 + 3.89 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.x += sin(p.y * 5.79 + time * 1.59) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.64, 0.98, 0.74) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
