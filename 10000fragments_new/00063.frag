uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.55;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.82)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.34 - t * 5.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.52), cos(time * 0.51)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.66 / 3.1415927, 0.63 / r + time * 2.71);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.35);
	col *= clamp(r * 1.70, 0.0, 1.0);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.58 + time * 7.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
