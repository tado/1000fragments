uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.93;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.71)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.21 - t * 6.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.15, vec3(0.58, 0.50, 0.59), vec3(0.46, 0.32, 0.42), vec3(1.07, 0.91, 1.27), vec3(0.46, 0.68, 0.42));
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
