uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.65;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.64)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 14.21 - t * 6.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.20 / 3.1415927, 1.18 / r + time * 1.33);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.09, vec3(0.42, 0.50, 0.42), vec3(0.43, 0.45, 0.34), vec3(1.30, 0.88, 1.28), vec3(0.11, 0.60, 0.17));
	col *= clamp(r * 2.58, 0.0, 1.0);
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
