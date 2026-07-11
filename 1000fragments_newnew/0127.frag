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
    float bx = p.x + (vnoise2(vec2(p.y * 2.85, t * 0.73)) - 0.5) * 0.70;
    v = exp(-abs(bx) * 8.70) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.34, 0.76) * sin(length(p) * 4.48 - (time * 0.81) * 2.29) * 0.14;
	p *= 1.0 + 0.29 * sin((time * 0.81) * 3.77);
	p = (floor(p * 23.6) + 0.5) / 23.6;
	vec3 col = vec3(field(p, (time * 0.81), 0.0), field(p, (time * 0.81), 0.08), field(p, (time * 0.81), 0.15));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 1.009, 0.936) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
