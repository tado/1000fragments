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
    float bx = p.x + (vnoise2(vec2(p.y * 1.65, t * 2.61)) - 0.5) * 0.57;
    v = exp(-abs(bx) * 6.76) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.64) * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.61 / 3.1415927, 0.46 / r + (time * 0.64) * 0.64);
	tv.x += tv.y * 0.18;
	float d = field(tv, (time * 0.64), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.051, 0.065, 0.073), vec3(0.974, 0.487, 0.434), cc);
	col *= clamp(r * 2.16, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.993, 0.987, 0.996);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
