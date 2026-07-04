uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.91;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.96)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 25.36 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.76)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 0.49 / r - time * 2.50);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.86 + time * 0.30);
	col *= clamp(r * 1.71, 0.0, 1.0);
	col = fract(col * 2.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
