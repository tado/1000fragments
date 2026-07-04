uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.23;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.62)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.92 - t * 6.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.03 / 3.1415927, 0.51 / r - time * 1.90);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.74, 0.54, 0.86) + vec3(0.22, 0.07, 0.03);
	col *= clamp(r * 1.34, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
