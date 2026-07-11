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
    float wr = length(p) + 0.28 * vnoise2(p * 4.67 + t * 0.63);
    v = sin(wr * 19.46 - t * 3.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.60) * 1.87));
	p = (floor(p * 28.1) + 0.5) / 28.1;
	float d = 0.5 + 0.5 * field(p, (time * 0.60), 0.0);
	vec3 col = mix(vec3(0.74, 0.84, 0.75), vec3(0.07, 0.07, 0.11), d);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.03 + (time * 0.60) * 17.66);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.988, 0.948) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
