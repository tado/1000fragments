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
    float bx = p.x + (vnoise2(vec2(p.y * 2.60, t * 1.08)) - 0.5) * 0.84;
    v = exp(-abs(bx) * 7.84) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.97 + (time * 0.63) * 0.75) * 0.09;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	{ p = vec2(atan(p.y, p.x) * 2.75, length(p) * 2.89 - (time * 0.63) * 0.41); }
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.63), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.046, 0.046, 0.087), vec3(0.464, 0.175, 0.658), smoothstep(0.0, 0.57, d)), vec3(1.000, 0.683, 0.831), smoothstep(0.57, 1.0, d));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.943, 0.981, 1.054);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
